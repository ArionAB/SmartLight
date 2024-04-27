import supabase from "@/utils/supabase/createClient";

export const fetchNetworkRoadTypesCount = () => {
    return async (dispatch: any, getState: () => any) => {
        const { data, error } = await supabase.rpc('count_network_road_types');

        if (!error) {
            return data
        }

        if (error) {
            console.error('Error fetching data:', error);
            return;
        }
    }
}