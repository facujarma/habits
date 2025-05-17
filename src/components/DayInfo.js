function DayInfo() {

    const transformDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();

        const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

        const monthName = months[month];

        const year = date.getFullYear();
        return `${day}th ${monthName} of ${year}`
    }

    return (
        <div className="my-4 p-3 h-12 w-full flex items-center justify-center bg-[#242424] border border-[#616161] rounded-xl">
            <span className="font-bold text-lg text-white">
               {transformDate(new Date())}
            </span>
        </div>
    )
}
export default DayInfo