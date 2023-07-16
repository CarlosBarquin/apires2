import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { slotCollection } from "../db/mongo.ts";
import { SlotSchema } from "../db/schemas.ts";
import { copyN } from "https://deno.land/std@0.154.0/io/util.ts";


type putSlotsContext = RouterContext<"/bookSlot", Record<string | number, string | undefined>, Record<string, any>>


export const bookSlot = async ( context : putSlotsContext) => {
    try {
        const result = context.request.body({ type: "json" });
        const value = await  result.value 
    
        if (!value?.day || !value?.hour || !value?.dni ||!value?.doctor) {
            context.response.status = 400;
           return
        }

        const Found = await slotCollection.findOne({day: value.day, hour : value.hour, avaiable : true, doctor: value.doctor})

        if(!Found){
            context.response.status = 404
            return
        }

        await slotCollection.updateOne({_id : Found._id}, {$set : {
            avaiable : false,
            dni : value.dni
        }})

        context.response.status = 200

    } catch (error) {
        context.response.body = error
    }
}