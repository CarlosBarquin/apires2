import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { slotCollection } from "../db/mongo.ts";
import { SlotSchema } from "../db/schemas.ts";


type getSlotsContext = RouterContext<"/availableSlots", Record<string | number, string | undefined>, Record<string, any>>

type getDoctorContext = RouterContext<"/doctorAppointments/:id_doctor", {
    id_doctor: string;
} & Record<string | number, string | undefined>, Record<string, any>>

type getPatientContext = RouterContext<"/patientAppointments/:id_patient", {
    id_patient: string;
} & Record<string | number, string | undefined>, Record<string, any>>


export const availableSlots = async (context : getSlotsContext) => {
    try {
        const params = getQuery(context, { mergeParams: true });
        const day = parseInt(params.day)
        const month = parseInt(params.month)
        const year = parseInt(params.year)
        const doctor = params.doctor
    
        if(!year || !month){
            context.response.status = 403
            context.response.body = []
            return
        }
    
        if(day){

            if(doctor){
                const Slots = await slotCollection.find({day: day , month : month, year: year, avaiable : true, doctor: doctor}).toArray()

                if(Slots.length===0){
                    context.response.body = []
                    return
                }
    
                context.response.body = Slots
                return
            }else{
                const Slots = await slotCollection.find({day: day , month : month, year: year, avaiable : true}).toArray()

                if(Slots.length===0){
                    context.response.body = []
                    return
                }
    
                context.response.body = Slots
                return
            }

        }else{
            if(doctor){
                const Slots = await slotCollection.find({ month : month, year: year, avaiable : true, doctor: doctor}).toArray()

                if(Slots.length===0){
                    context.response.body = []
                    return
                }
    
                context.response.body = Slots
                return
            }else{
                const Slots = await slotCollection.find({month : month, year: year, avaiable : true}).toArray()

                if(Slots.length===0){
                    context.response.body = []
                    return
                }
    
                context.response.body = Slots
                return
            }
        }

        
    } catch (error) {
        context.response.body = error
    }

}

export const doctorApp = async ( context : getDoctorContext) => {
    try {
        const params = getQuery(context, { mergeParams: true });
        const day = parseInt(params.day)
        const month = parseInt(params.month)
        const year = parseInt(params.year)

        const doctor = context.params.id_doctor

            
        if(!year || !month || !day){
            context.response.status = 403
            context.response.body = []
            return
        }

        const date = new Date(year,month,day)

        const slots = (await slotCollection.find({doctor : doctor, avaiable : false}).toArray()).filter((slot : SlotSchema) => {
            const slotDate = new Date(slot.year,slot.month,slot.day)
            return slotDate.getTime() >= date.getTime()
        })


        context.response.body = slots
        
        

        
        
        
    } catch (error) {
        context.response.body = error
    }
}

export const  patientApp = async ( context : getPatientContext) => {
    try {
        const params = getQuery(context, { mergeParams: true });
        const day = parseInt(params.day)
        const month = parseInt(params.month)
        const year = parseInt(params.year)

        const dni = context.params.id_patient

            
        if(!year || !month || !day ){
            context.response.status = 403
            context.response.body = []
            return
        }

        const date = new Date(year,month,day)

        const slots = (await slotCollection.find({dni : dni}).toArray()).filter((slot : SlotSchema) => {
            const slotDate = new Date(slot.year,slot.month,slot.day)
            return slotDate.getTime() >= date.getTime()
        })


        context.response.body = slots
        
        

        
        
        
    } catch (error) {
        context.response.body = error
    }
}

