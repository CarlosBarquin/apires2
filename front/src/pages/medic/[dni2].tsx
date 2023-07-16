
import { GetServerSideProps, NextPage } from "next"
import Medic from '@/components/Medic'

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {dni2}  = context.query
    
    return {    
        props: {
            dni2
        }
    }

}

const Page : NextPage<{dni2:string}> = ({dni2}) => {
    return (
        <>
            <Medic id={dni2}/>
        </>
    )
}

export default Page