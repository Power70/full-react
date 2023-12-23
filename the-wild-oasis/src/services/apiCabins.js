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

export async function CreateCabin(newCabin){
    const imageName = `
        ${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    // https://nmymghgzjjijjeqivblj.supabase.co/cabin-001.jpg?t=2023-12-21T09%3A33%3A28.496Z
    // 1. create cabin

    const { data, error } = await supabase
        .from('cabins')
        .insert([{...newCabin, image: imagePath }])
        .select();
    if(error) {
        console.error(error);
        throw new Error("cabin could not be created");
    }

    // 2. Upload image
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