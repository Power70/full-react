import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {

    const { data, error } = await supabase
    .from("cabins")
    .select("*")

    if(error) {
        console.error(error);
        throw new Error("cabins could not be loaded");
    }
    return data;
}

// To know we are in edit session we need to pass in the newCabin and the edit id
export async function CreateEditCabin(newCabin, id){
    console.log(newCabin, id)
    // create a new variable to check what kind of image it is
    // i.e if the image start with the supabase Url
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `
        ${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // https://nmymghgzjjijjeqivblj.supabase.co/cabin-001.jpg?t=2023-12-21T09%3A33%3A28.496Z

    // 1. create/edit cabin
    // We want to create a cabin here only if there is no id
    let query = supabase.from("cabins");

    // A) Create
    if(!id) query = query.insert([{...newCabin, image: 
        imagePath }]);

    // B) Edit
    if(id) query = query.update({ ...newCabin, image: 
        imagePath})
    .eq('id', id);
        
        const { data, error } = await query.select().single();
 
    if(error) {
        console.error(error);
        throw new Error("cabin could not be created");
    }

    // 2. Upload image
    if(hasImagePath) return data;
    const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
    
//   Delete the cabin if an error uploading
if(storageError){
    await supabase.from('cabins')
    .delete().eq('id', data.id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded and the cabin was not created");
}
    return data;
}

export async function deleteCabin(id){

    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

    if(error) {
        console.error(error);
        throw new Error("cabin could not be deleted");
    }
    return data;
} 