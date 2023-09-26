
function caculationDate(inputDateTypeString) {
    const [yearStr, monthStr] = inputDateTypeString.split('-');

    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // Thực hiện phép cộng 1 vào tháng
    const newMonth = month + 1;

    // Tạo lại chuỗi kết quả
    const result = `${year + Math.floor(newMonth / 13)}-${(newMonth % 12) || 12}`;

    return (result);

}

function AddFilter(nameOfRow) {
    let div = document.querySelector(`#${nameOfRow}`).parentElement;

    function filterIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>`
    }


    let filterSpan = document.createElement("span");
    filterSpan.style.float = "right";
    filterSpan.style.height = "20px";
    filterSpan.style.opacity = 0.3;
    filterSpan.innerHTML = filterIcon();
    filterSpan.onmouseenter = function () {
        this.style.opacity = 1;
    };
    filterSpan.onmouseleave = function () {
        this.style.opacity = 0.3;
    };

    let insertRow = div.children[2];

    div.insertBefore(filterSpan, insertRow);

    return(filterSpan)
}
export { caculationDate, AddFilter }