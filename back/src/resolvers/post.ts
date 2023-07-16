import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { slotCollection } from "../db/mongo.ts";
import { SlotSchema } from "../db/schemas.ts";

type Slote = {
    day : number,
    month : number,
    year : number,
    hour : number,
    doctor : string
}
type addSlotContext = RouterContext<"/addSlot", Record<string | number, string | undefined>, Record<string, any>>

export const addSlot = async (context : addSlotContext) => {
    try {
        const result = context.request.body({ type: "json" });
        const value : Slote = await  result.value 
    
        if (!value?.year || !value?.month || !value?.day || !value?.hour || !value.doctor) {
            context.response.status = 400;
           return
        }

        if(value.day > 23 || value.day < 1 ){
            context.response.status = 400;
            return
        }

        if(value.month > 12 || value.month < 1 ){
            context.response.status = 400;
            return
        }

        if(value.hour > 23 || value.month < 0 ){
            context.response.status = 400;
            return
        }


        const Found = await slotCollection.findOne({year : value.year, month : value.month, day:value.day, hour : value.hour})
        if(Found){

            if(Found.doctor === value.doctor){

                if(Found.avaiable === true){
                    context.response.status = 200
                    return
                }
                context.response.status = 409
                    return
            }

        }

     

        const Slot : SlotSchema = {
            _id : new ObjectId(),
            year : value.year,
            month : value.month,
            day : value.day,
            hour : value.hour,
            avaiable : true,
            dni : "",
            doctor : value.doctor
        }

        await slotCollection.insertOne(Slot)

        context.response.body = Slot._id
    
    
    } catch (e) {
        context.response.body = e
    }
}