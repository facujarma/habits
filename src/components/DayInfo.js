function DayInfo() {

    const transformDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();

        const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

        const monthName = months[month];

        const year = date.getFullYear();
        return `${day} de ${monthName} del ${year}`
    }

    return (
        <div className="my-6 p-3 h-12 w-full flex items-center justify-center bg-[#242424] border border-[#616161] rounded-xl">
            <span className="font-bold text-lg text-white">
               {transformDate(new Date())}
            </span>
        </div>
    )
}
export default DayInfo