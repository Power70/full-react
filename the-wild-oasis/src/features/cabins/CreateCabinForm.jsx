
// import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
   // create a variable that combine both isediting/creating
   const isworking = isCreating || isEditing;

  const {id: editId, ...editValues} = cabinToEdit;
  // check if you are actually editing
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;
  // console.log(errors)

  function onSubmit(data) {
    // call mutate function to  update supabase

    // check if the image is a string or an object

    const image = typeof data.image === "string" ? 
    data.image : data.image[0];

    if (isEditSession) 
      editCabin(
        {newCabinData: {...data, image}, id: editId},
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else 
      createCabin(
        {...data, image: image},
        {
          onSuccess: (data) => {
            console.log(data)
            reset();
          },
        }
      );
  }
  function onError(errors) {
    // console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input 
            type="text" 
            disabled={isworking}
            id="name" 
            {...register("name", {
            required: "This field is required"}
            )}  
          />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input 
            type="number" 
            disabled={isworking}
            id="maxCapacity" {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity    should be at least 1",
            },  
            })}
          />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input 
            type="number" 
            id="regularPrice" 
            disabled={isworking}
            {...register("regularPrice", {
            required: "This field is required",
            min: { 
              value: 1,
              message: "Capacity should be at least 1",
            },  
            })} 
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input 
            type="number" 
            id="discount" 
            disabled={isworking}
            defaultValue={0} 
            {...register("discount", {
            required: "This field is required",
            validate: (value) => 
              value <= getValues().regularPrice || 
              "Discount should be less than the regular price",
            })}
        />
      </FormRow>

      <FormRow 
        label="Description for website" 
        error={errors?.description?.message}>
          <Textarea 
              type="number" 
              id="description"
              disabled={isworking} 
              defaultValue="" 
              {...register("description", {
              required: "This field is required"
              })}
          />
      </FormRow>  
 
      <FormRow label="Cabin photo">
        <FileInput 
          id="image" 
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ?  false : "This field is required"
            })} 
        /> 
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isworking}>{isEditSession ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
