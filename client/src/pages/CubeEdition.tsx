import Cube from "@/components/Cube/Cube"

type IProps = {
    id:number
}

export const CubeEdition = (props:IProps) => {
    return(
        <div className="w-full h-full">
            <Cube editable id={props.id}/>
        </div>
    )
}