import supabase from "./createClient"

export const getImage = (url: string) => {
    const { data } = supabase
        .storage
        .from('smart-light-bucket')
        .getPublicUrl(url)
    return data.publicUrl
}