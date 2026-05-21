// SavorKit Client-side Controller (2026)

// Recipe Switching Mechanism
function switchRecipe(recipeId) {
    // Hide all recipe contents
    const contents = document.querySelectorAll('.recipe-content');
    contents.forEach(content => {
        content.classList.add('hidden');
    });

    // Remove active styles from all tabs
    const tabs = document.querySelectorAll('.recipe-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active', 'bg-brandCoral', 'text-brandWarmWhite');
        tab.classList.add('bg-white', 'text-brandNavy');
    });

    // Show selected recipe content
    const activeContent = document.getElementById(`recipe-${recipeId}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }

    // Add active styles to selected tab
    const activeTab = document.getElementById(`tab-${recipeId}`);
    if (activeTab) {
        activeTab.classList.add('active', 'bg-brandCoral', 'text-brandWarmWhite');
        activeTab.classList.remove('bg-white', 'text-brandNavy');
    }
}

// Ensure first tab is loaded correctly
document.addEventListener('DOMContentLoaded', () => {
    switchRecipe('thai');
});

// Form Submission & API Integration (Legacy Fallback Route for Baget)
const leadForm = document.getElementById('leadForm');
const submitButton = document.getElementById('submitButton');
const formFeedback = document.getElementById('formFeedback');

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Reset status
        formFeedback.classList.add('hidden');
        formFeedback.classList.remove('bg-green-100', 'text-green-800', 'border-green-800', 'bg-red-100', 'text-red-800', 'border-red-800');
        submitButton.disabled = true;
        submitButton.innerText = 'Securing Access...';

        try {
            const response = await fetch('https://app.baget.ai/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyId: '81cb7253-0d7c-427f-90fe-79d8ba828f4a',
                    email: email,
                    name: firstName
                })
            });

            if (response.ok) {
                // Success output
                formFeedback.innerText = `Thanks, ${firstName}! You've been secured on the SavorKit launch list. We'll be in touch!`;
                formFeedback.classList.remove('hidden');
                formFeedback.classList.add('bg-green-100', 'text-green-800', 'border-green-800', 'chunky-border');
                leadForm.reset();
                submitButton.innerText = 'Joined Successfully!';
            } else {
                throw new Error('Server returned error response');
            }
        } catch (error) {
            console.error('Error submitting lead:', error);
            formFeedback.innerText = 'Oops! We couldn\'t submit your signup. Please check your network and try again.';
            formFeedback.classList.remove('hidden');
            formFeedback.classList.add('bg-red-100', 'text-red-800', 'border-red-800', 'chunky-border');
            submitButton.disabled = false;
            submitButton.innerText = 'Secure Early Access & Gift';
        }
    });
}
