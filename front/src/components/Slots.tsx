
import Link from "next/link";
import { FC, use, useEffect, useState } from "react";
import { ObjectId } from 'mongodb';

type Slot = {
    _id: ObjectId
    day : number,
    month : number,
    year : number,
    hour : number,
    avaiable : boolean,
    dni : string
    doctor : string
  }



const pagina: FC<{id : string}> = ({id}) => {

    const [slots, setSlots] = useState<Slot[]>([])
    const [slots2, setSlots2] = useState<Slot[]>([])

    const [year, setYear] = useState<number>(0)
    const [month, setMonth] = useState<number>(0)
    const [day, setDay] = useState<number>(0)



    const [year2, setYea2] = useState<number>(0)
    const [month2, setMonth2] = useState<number>(0)
    const [day2, setDay2] = useState<number>(0)
    const [doctor2, setDoctor2] = useState<string>("")

    
    const [day3, setDay3] = useState<number>(0)
    const [hour3, setHour3] = useState<number>(0)
    const [doctor3, setDoctor3] = useState<string>("")

    const [ids , setIds] = useState<string[]> ([])
    const [E2 , setE2] = useState<number>(0)

    const [cambia, setCambia] = useState<number>(0); 
    
  useEffect(() => {
    const fetchData = async () => {


      const lines = await fetch(`http://localhost:8080/availableSlots?year=${year2}&month=${month2}&day=${day2}&doctor=${doctor2}`);
      const json : Slot[] = await lines.json();
      setSlots(json);
      console.log(json);
      
    };
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [cambia, year2, month2, day2, doctor2])

  useEffect(() => {
    const fetchData = async () => {


      const lines = await fetch(`http://localhost:8080/patientAppointments/${id}?year=${year}&month=${month}&day=${day}`);
      const json : Slot[] = await lines.json();
      setSlots2(json);
      console.log(json);
      
    };
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [cambia, year, month, day])






  const bookSubmit = async () => {

    try {
      await fetch("http://localhost:8080/bookSlot", {
        method: "PUT",
        headers: {
          'content-type': 'application/json'
  
        },
        body: JSON.stringify({ day : day3, hour : hour3,  doctor : doctor3 , dni : id}),
      });
      
      setCambia(cambia+1)
    } catch (error) {
      const errorMessage = error as string
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement!.textContent = errorMessage; 
    }

  };


/* 
useEffect(()=> {
    alert(year)
    alert(month)
    alert(day)
    alert(hour)
},[year, month, day, hour])

 
 */

useEffect(()=>{
  if(doctor3 === "" || day3 === 0 ) return
  bookSubmit()
  setDay3(0)
  setHour3(0)
  setDoctor3("")
},[E2])


      return (
          <>

        <h1>Bienvenido : {id}</h1>
        <h2>mostrar</h2>
        <input type="number" placeholder="year" onChange={(e)=> setYea2(parseInt(e.target.value))}></input>
        <input type="number" placeholder="month" onChange={(e)=> setMonth2(parseInt(e.target.value))}></input>
        <input type="number" placeholder="day" onChange={(e)=> setDay2(parseInt(e.target.value))}></input>
        <input type="text" placeholder="doctor" onChange={(e)=> setDoctor2(e.target.value)}></input>
        <br></br>
        
        {slots?.map((e)=> {
            return(
                <>
                {e.day}--
                {e.month}--
                {e.year}--
                {e.hour}--
                {e.avaiable ? "disponoble" : "nodisponoble" }--
                {e.doctor}--
                <button onClick={()=> {
                  //hacer esto asi ya no tiene sentido pero lo dejo que me quedo chulo
                  if(ids.includes(e._id.toString())){
                    setIds(ids.filter((id)=> id !== e._id.toString()))
                  }else{
                    setIds([...ids, e._id.toString()])
                  } 
                }}>iniciar reserva</button>
                <br></br>
                {ids.includes(e._id.toString()) && (<>
                  <button onClick={()=> {
                     setDay3(e.day)
                     setHour3(e.hour)
                     setDoctor3(e.doctor)
                     setE2(E2+1)
                  }}>afawf</button>
                </>)}
                <br></br>
                </>
            )
        })}

        <br></br>
        <h1>SLOTS RESERVADOS</h1>
        <input type="number" placeholder="year" onChange={(e)=> setYear(parseInt(e.target.value))}></input>
        <input type="number" placeholder="month" onChange={(e)=> setMonth(parseInt(e.target.value))}></input>
        <input type="number" placeholder="day" onChange={(e)=> setDay(parseInt(e.target.value))}></input>
        <br></br>

        {slots2?.map((e)=> {
            return(
                <>
                {e.day}--
                {e.month}--
                {e.year}--
                {e.hour}--
                {e.avaiable ? "disponoble" : "nodisponoble" }--
                {e.doctor}
                <br></br>
                </>
            )
        })}


     
             
          
          </>
      )
  }


  export default pagina