function formatDate(dateString:string): string {
    // Parse the input date string
    let date = new Date(dateString);
    
    // Extract components
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    let year = date.getFullYear();
    
    // Format hours and minutes
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Determine AM/PM
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    // Format the final date string
    let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
    
    return formattedDate;
}

export default formatDate;