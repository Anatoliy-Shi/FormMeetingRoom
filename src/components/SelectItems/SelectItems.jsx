import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {nanoid} from "nanoid";


export const SelectItems = ({value, name, change, length, count}) => {
    return (
        <Box sx={{
            maxHeight: 'calc(100% - 480px)',
            width: '100%',
            marginTop: 2,
        }}>
            <FormControl fullWidth>
                <InputLabel sx={{
                    color: '#000',
                }}>
                    {name}
                </InputLabel>
                <Select
                    sx={{
                        color: '#000',
                    }}
                    value={value}
                    label={name}
                    onChange={change}>
                    {[...Array(length)].map((el, index) =>
                        <MenuItem
                            sx={{
                                color: '#000',
                                '&.Mui-selected': {
                                    backgroundColor: '#0c8ffa1a;',
                                },
                            }}
                            key={nanoid()}
                            value={`${index + count} ${name}`}> {`${index + count} ${name}`}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}