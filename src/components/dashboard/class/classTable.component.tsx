import { TypographyTableHead } from '@/components/mui/typography.component';
import { ITeacher } from '@/types/teacher.interface';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Props {
    teachers: ITeacher[]
}

export default function ClassTable({ teachers }: Props) {

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TypographyTableHead>No</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Name</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Age</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Major</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Experience</TypographyTableHead>
                        </TableCell>
                        <TableCell>
                            <TypographyTableHead>Email</TypographyTableHead>
                        </TableCell>
                        <TableCell align="right">
                            <TypographyTableHead>Action</TypographyTableHead></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teachers?.map((teacher: ITeacher, index: number) => {
                        return (
                            <TableRow key={teacher?._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{teacher?.name}</TableCell>
                                <TableCell>{teacher?.age}</TableCell>
                                <TableCell>{teacher?.major}</TableCell>
                                <TableCell>{teacher?.exp} {teacher?.exp > 1 ? 'years' : 'year'}</TableCell>
                                <TableCell>{teacher?.email}</TableCell>
                                <TableCell align="right" sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant='contained' color='warning'>update</Button>
                                    <Button variant='contained' color='error'>delete</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
}
