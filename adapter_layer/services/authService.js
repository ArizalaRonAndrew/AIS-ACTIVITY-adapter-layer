export const registerStudent = async (studentProfile) => {
    // 1. VALIDATION: Check for the fields your AUTH SYSTEM is sending
    const requiredFields = ['firstName', 'lastName', 'dob', 'address', 'course', 'major', 'status'];
    const missingFields = requiredFields.filter(field => !studentProfile[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // 2. MAPPING BLOCK: Translate Modern names to Legacy names
    // This is where we fix the issue of empty records in Render.
    const legacyProfile = {
        name: `${studentProfile.firstName} ${studentProfile.lastName}`, // Merge names into 'name'
        birthdate: studentProfile.dob,       // 'dob' becomes 'birthdate'
        address: studentProfile.address,     // 'address' stays 'address'
        program: `${studentProfile.course} ${studentProfile.major}`,      // 'course' becomes 'program'
        studentStatus: studentProfile.status // 'status' becomes 'studentStatus'
    };

    console.log("Adapter Service: Validation passed. Forwarding Mapped Profile to Render...");

    // 3. FORWARDING: Send the LEGACY profile to the Render API
    const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(legacyProfile) // Sending the translated data
    });

    // 4. ERROR HANDLING: Catch rejections from Render
    if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Legacy API rejected the request: ${response.status} - ${errorText}`);
    }

    // 5. SUCCESS: Return the full record (including the new _id) back to the Auth System
    const data = await response.json();
    return data;
}