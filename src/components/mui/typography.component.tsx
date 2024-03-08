import * as React from 'react';
import Typography from '@mui/material/Typography';

export function TypographyTableHead({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Typography variant="h6" color="MenuText" gutterBottom>
            {children}
        </Typography>
    );
}
