
export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <>
            <h1>alo home page layout</h1>
            <div>{children}</div>
        </>

    )
}