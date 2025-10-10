const timeFormat =(minutes)=>{
    const hours = Math.floor(minutes/60);
    const remender = minutes % 60;
    return `${hours}h ${remender}m`
}

export default timeFormat;