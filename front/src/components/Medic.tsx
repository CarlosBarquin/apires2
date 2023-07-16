
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



const pagina : FC<{id : string}> = ({id}) => {

    const [slots, setSlots] = useState<Slot[]>([])
    const [slots2, setSlots2] = useState<Slot[]>([])

    const [year, setYear] = useState<number>(0)
    const [month, setMonth] = useState<number>(0)
    const [day, setDay] = useState<number>(0)
    const [hour, setHour] = useState<number>(0)
    
    const [date, setDate] = useState<Date>()

    const [year2, setYea2] = useState<number>(0)
    const [month2, setMonth2] = useState<number>(0)
    const [day2, setDay2] = useState<number>(0)

    const [year4, setYear4] = useState<number>(0)
    const [month4, setMonth4] = useState<number>(0)
    const [day4, setDay4] = useState<number>(0)


    
    const [year3, setYear3] = useState<number>(0)
    const [month3, setMonth3] = useState<number>(0)
    const [day3, setDay3] = useState<number>(0)
    const [hour3, setHour3] = useState<number>(0)
    const [E , setE] = useState<number>(0)


    const [dni2 , setDni2]=  useState<string>("")
    const [cambia, setCambia] = useState<number>(0); 
    
  useEffect(() => {
    const fetchData = async () => {


      const lines = await fetch(`http://localhost:8080/availableSlots?year=${year2}&month=${month2}&day=${day2}&doctor=${id}`);
      const json : Slot[] = await lines.json();
      setSlots(json);
      console.log(json);
      
    };
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [cambia, year2, month2, day2])


  useEffect(() => {
    const fetchData = async () => {


      const lines = await fetch(`http://localhost:8080/doctorAppointments/${id}?year=${year4}&month=${month4}&day=${day4}`);
      const json : Slot[] = await lines.json();
      setSlots2(json);
      console.log(json);
      
    };
    try {
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, [cambia, year4, month4, day4])





  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:8080/addSlot", {
        method: "POST",
        headers: {
          'content-type': 'application/json'
  
        },
        body: JSON.stringify({day, year, month , hour, doctor : id}),
      });
      
      setCambia(cambia+1)
    } catch (error) {
      const errorMessage = error as string
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement!.textContent = errorMessage; 
    }

  };
;

  const deleteSubmit = async () => {
    try {
      await fetch(`http://localhost:8080/removeSlot?year=${year3}&month=${month3}&day=${day3}&hour=${hour3} `, {
        method: "DELETE",

      });
      
      setCambia(cambia-1)
    } catch (error) {
      const errorMessage = error as string
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement!.textContent = errorMessage; 
    }

  };

  const dateToSlot = (date: Date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());
    setHour(date.getHours());
}

/* 
useEffect(()=> {
    alert(year)
    alert(month)
    alert(day)
    alert(hour)
},[year, month, day, hour])

 
 */

useEffect(()=>{
    if(month3 === 0 || day3 === 0||  year3 === 0 ) return
    deleteSubmit()
    setYear3(0)
    setDay3(0)
    setHour3(0)
    setMonth3(0)
},[E])


      return (
          <>
        <h5>bienvenido : {id}</h5>
        <h1>crear Slot</h1>
        <input type="datetime-local" placeholder="date" onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setDate(newDate);
                    dateToSlot(newDate);
        }} />
        <button onClick={handleSubmit}>crear</button>
        <div id="error-message"></div>
        <h2>SLOTS DISPONIBLES</h2>
        <input type="number" placeholder="year" onChange={(e)=> setYea2(parseInt(e.target.value))}></input>
        <input type="number" placeholder="month" onChange={(e)=> setMonth2(parseInt(e.target.value))}></input>
        <input type="number" placeholder="day" onChange={(e)=> setDay2(parseInt(e.target.value))}></input>
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
                    setYear3(e.year)
                    setDay3(e.day)
                    setHour3(e.hour)
                    setMonth3(e.month)
                    setE(E+1)
                }}>borrar</button>
                <br></br>
                </>
            )
        })}

        <br></br>
        <h4>SLOTS RESERVADOS</h4>
        <input type="number" placeholder="year" onChange={(e)=> setYear4(parseInt(e.target.value))}></input>
        <input type="number" placeholder="month" onChange={(e)=> setMonth4(parseInt(e.target.value))}></input>
        <input type="number" placeholder="day" onChange={(e)=> setDay4(parseInt(e.target.value))}></input>
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