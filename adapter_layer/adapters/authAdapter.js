export const create = async (profile) => {
    // 1. We combine the data here into transformedProfile
    const transformedProfile = {
        name: profile.firstName + " " + profile.lastName,
        birthdate: profile.dob,
        
        program: profile.course + " " + profile.major, 
        address: profile.address,
        studentStatus: profile.status,
    };

    console.log("Forwarding to Legacy API:", transformedProfile);

    const response = await fetch(`https://ais-simulated-legacy.onrender.com/api/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // FIX: Changed 'userProfile' to 'transformedProfile'
        body: JSON.stringify(transformedProfile) 
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Legacy API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
}