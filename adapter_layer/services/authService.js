export const registerStudent = async (studentProfile) => {
    // 1. Validate the incoming data from your Auth System
    const requiredFields = ['firstName', 'lastName', 'dob', 'course', 'major', 'status'];
    const missingFields = requiredFields.filter(field => !studentProfile[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log("Adapter Service validation passed. Forwarding to Render API...");

    // 2. Forward the valid profile to the live Render legacy API
    const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentProfile)
    });

    // 3. Catch any errors thrown by the Render API (e.g., 400 Bad Request, 500 Server Error)
    if (!response.ok) {
        const errorText = await response.text(); // Read the error message from Render if there is one
        throw new Error(`Legacy API rejected the request: ${response.status} - ${errorText}`);
    }

    // 4. Return the successful response back to your controller
    const data = await response.json();
    return data;
}