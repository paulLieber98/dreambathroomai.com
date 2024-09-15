document.getElementById('generateButton').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;

    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    // Display loading feedback (optional)
    document.getElementById('generateButton').textContent = 'Generating...';

    try {
        // Fetch the generated image from your backend (to be set up with API)
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            // Set the generated image src and display it
            const imageElement = document.getElementById('generatedImage');
            imageElement.src = imageUrl;
            imageElement.style.display = 'block';

            // Reset the button text
            document.getElementById('generateButton').textContent = 'Generate Image';
        } else {
            alert('Error generating image');
            document.getElementById('generateButton').textContent = 'Generate Image';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image');
        document.getElementById('generateButton').textContent = 'Generate Image';
    }
});
