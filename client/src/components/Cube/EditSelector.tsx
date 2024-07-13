import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

type IProps = {
  setEditMode:()=>void
}

export default function EditSelector(props:IProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch onClick={()=>props.setEditMode()} id="edit-mode" />
      <Label htmlFor="edit-mode">Edit mode</Label>
    </div>
  )
}
