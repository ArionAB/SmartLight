import { selectFilters } from '@/utils/Store/Selectors/miscSelectors'
import { setFilters } from '@/utils/Store/Slices/miscSlice'
import { useAppDispatch, useAppSelector } from '@/utils/Store/hooks'
import { Divider, FormControl, FormControlLabel, FormLabel, Menu, Radio, RadioGroup, Typography } from '@mui/material'
import React, { FC } from 'react'
const Filter: FC<{ anchor: Element | null, setFilterAnchor: Function }> = ({ anchor, setFilterAnchor }) => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(selectFilters)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilters({ ...filters, [e.target.name]: e.target.value }))
    }

    return (
        <Menu
            anchorEl={anchor}
            open={anchor ? true : false}
            onClose={() => setFilterAnchor(null)}
            sx={{
                minWidth: "250px"
            }}

        >
            <Typography minWidth={250} marginLeft={2} fontWeight={600}>Filtrează după:</Typography>
            <Divider></Divider>
            <FormControl sx={{
                padding: "1rem"
            }}>
                <FormLabel >Poze</FormLabel>
                <RadioGroup
                    value={filters.pictures}
                    name="pictures"
                    onChange={(e) => handleChange(e)}
                >
                    <FormControlLabel value="with_pictures" control={<Radio />} label="Cu poze" />
                    <FormControlLabel value="no_pictures" control={<Radio />} label="Fără poze" />
                    <FormControlLabel value="all_pictures" control={<Radio />} label="Toate" />
                </RadioGroup>
            </FormControl>
            <Divider></Divider>
            <FormControl sx={{
                padding: "1rem"
            }}>
                <FormLabel >Lampă</FormLabel>
                <RadioGroup
                    value={filters.lamps}
                    name="lamps"
                    onChange={(e) => handleChange(e)}
                >
                    <FormControlLabel value="with_lamps" control={<Radio />} label="Fără lampă" />
                    <FormControlLabel value="no_lamps" control={<Radio />} label="Cu lampă" />
                    <FormControlLabel value="all_lamps" control={<Radio />} label="Toate" />
                </RadioGroup>
            </FormControl>
            <Divider></Divider>
            <FormControl sx={{
                padding: "1rem"
            }}>
                <FormLabel >Tip</FormLabel>
                <RadioGroup
                    value={filters.type}
                    name="type"
                    onChange={(e) => handleChange(e)}
                >
                    <FormControlLabel value="pole" control={<Radio />} label="Stâlp" />
                    <FormControlLabel value="lamp" control={<Radio />} label="Lampă" />
                    <FormControlLabel value="both" control={<Radio />} label="Toate" />
                </RadioGroup>
            </FormControl>
            <Divider></Divider>


        </Menu>
    )
}

export default Filter