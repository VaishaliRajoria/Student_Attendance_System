// Replace this with your classroom coordinates (example coordinates)
const classLatitude = 28.6139;    // Example: New Delhi latitude
const classLongitude = 77.2090;   // Example: New Delhi longitude

// Function to calculate distance between two coordinates (in meters)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2 - lat1) * Math.PI/180;
  const Δλ = (lon2 - lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return distance; // in meters
}

// Function to get today's date and set it automatically
function setTodayDate() {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  document.getElementById('attendance-date').value = formattedDate;
}

// Call on page load
window.onload = function() {
  setTodayDate();
  loadAttendanceHistory();
};

// Function to mark attendance
function markAttendance() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      const distance = calculateDistance(userLat, userLon, classLatitude, classLongitude);
      
      console.log(`Distance to class: ${distance.toFixed(2)} meters`);

      if (distance <= 20) {
        const selectedDate = document.getElementById('attendance-date').value;
        saveAttendance(selectedDate);
        alert('Attendance marked successfully! ✅');
      } else {
        alert('You are too far from the classroom. Attendance not marked ❌');
      }
    },
    (error) => {
      console.error(error);
      alert('Unable to fetch your location.');
    }
  );
}

// Save attendance to LocalStorage (for demo purpose)
function saveAttendance(date) {
  let attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];
  attendanceData.push(date);
  localStorage.setItem('attendance', JSON.stringify(attendanceData));
  loadAttendanceHistory();
}

// Load attendance history
function loadAttendanceHistory() {
  const historyList = document.getElementById('attendance-history');
  historyList.innerHTML = '';

  const attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];

  // Only show last 7 records
  const last7 = attendanceData.slice(-7);

  last7.forEach(date => {
    const li = document.createElement('li');
    li.textContent = `Present on: ${date}`;
    historyList.appendChild(li);
  });
}

// Logout Button Functionality
document.getElementById("logout-btn").addEventListener("click", function () {
  localStorage.removeItem("AdminName");
  window.location.href = "login.html";
});
