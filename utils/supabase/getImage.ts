import supabase from "./createClient"

export const getImage = (url: string) => {
    const { data } = supabase
        .storage
        .from('illumitech-bucket')
        .getPublicUrl(url)
    return data.publicUrl
}