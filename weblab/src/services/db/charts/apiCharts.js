import { supabase } from "../supabase";

export async function getChartsWeeks(year, month) {
    const { data, error } = await supabase.rpc('get_charts_weeks', { p_year: year, p_month: month });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export async function getChartsMonths(year) {
    const { data, error } = await supabase.rpc('get_charts_months', { p_year: year });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export async function getChartsYears() {
    const { data, error } = await supabase.rpc('get_charts_years');
    if (error) {
        console.error(error);
        return [];
    }
    return data;
};