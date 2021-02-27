// Your code here
const createEmployeeRecord = function(record) {
    const employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee;
}

const createEmployeeRecords = function(arr) {
    const employees = arr.map(e => createEmployeeRecord(e));
    return employees
}

const createTimeInEvent = function(record, dateStamp) {
    record["timeInEvents"].push(
        {
            type: "TimeIn",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )
    return record;
}

const createTimeOutEvent = function(record, dateStamp) {
    record["timeOutEvents"].push(
        {
            type: "TimeOut",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )
    return record;
}

const hoursWorkedOnDate = function(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date)
    const timeOut = record.timeOutEvents.find(e => e.date === date)

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    
    return hoursWorked;
}

const wagesEarnedOnDate = function(record, date) {
    const hours = hoursWorkedOnDate(record, date);
    const wages = hours * record.payPerHour

    return wages;
}

const allWagesFor = function(record) {
    const datesWorked = record.timeInEvents.map(e => e.date)

    const allWages = datesWorked.map(e => wagesEarnedOnDate(record, e))

    const totalWages = allWages.reduce((acc, val) => acc + val, 0)
    return totalWages;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

const calculatePayroll = function(arr) {
    const payroll = arr.reduce(function(total, e) {
        return total + allWagesFor(e);
    }, 0)
    return payroll;
}