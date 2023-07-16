
import { GetServerSideProps, NextPage } from "next"
import Slots from '@/components/Slots'

export const getServerSideProps: GetServerSideProps = async (context) => {

    const {dni}  = context.query
    
    return {    
        props: {
            dni
        }
    }

}

const Page : NextPage<{dni:string}> = ({dni}) => {
    return (
        <>
            <Slots id={dni}/>
        </>
    )
}

export default Page