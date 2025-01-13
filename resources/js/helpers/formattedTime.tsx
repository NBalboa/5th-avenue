const formattedTime = (time: string) => {
    // const [hour, minute] = time.split(":").map(Number);

    // const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    //     .toString()
    //     .padStart(2, "0")}:00`;

    const formatted = `${time}:00`;

    return formatted;
};

export default formattedTime;
