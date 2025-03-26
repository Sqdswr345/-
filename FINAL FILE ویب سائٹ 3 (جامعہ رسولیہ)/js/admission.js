// Signature Pad Implementation
const signaturePad = {
    init: function() {
        const studentSignature = document.getElementById('studentSignature');
        const parentSignature = document.getElementById('parentSignature');

        if (studentSignature && parentSignature) {
            this.setupSignaturePad(studentSignature);
            this.setupSignaturePad(parentSignature);
        }
    },

    setupSignaturePad: function(element) {
        const canvas = document.createElement('canvas');
        canvas.className = 'signature-canvas';
        element.innerHTML = '';
        element.appendChild(canvas);

        const signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(0, 0, 0)'
        });

        element.addEventListener('click', () => {
            const rect = element.getBoundingClientRect();
            const startX = rect.left + window.scrollX;
            const startY = rect.top + window.scrollY;
            
            // Create a temporary canvas for the signature
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = element.offsetWidth;
            tempCanvas.height = element.offsetHeight;
            const tempCtx = tempCanvas.getContext('2d');
            
            // Draw the signature
            signaturePad.clear();
            signaturePad.onEnd = () => {
                const data = signaturePad.toDataURL();
                tempCtx.drawImage(element.querySelector('canvas'), 0, 0);
                
                // Save the signature as an image
                const link = document.createElement('a');
                link.download = 'signature.png';
                link.href = data;
                link.click();
            };
        });
    }
};

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('admissionForm');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    // Function to show notification
    function showNotification(message, isError = false) {
        notificationText.textContent = message;
        notification.classList.remove('hide');
        notification.classList.toggle('error', isError);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('hide');
        }, 3000);
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                showNotification('لطفاً تمام ضروری معلومات درج کریں', true);
                return;
            }

            try {
                // Create a new PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                
                // Add form data to PDF
                const formData = new FormData(form);
                let y = 20;
                
                doc.setFontSize(12);
                doc.text('جامعہ رسولیہ شیرازیہ رضویہ - داخلہ فارم', 105, 20, { align: 'center' });
                y += 10;
                
                // Prepare email body
                let emailBody = 'جامعہ رسولیہ شیرازیہ رضویہ - داخلہ فارم\n\n';
                
                formData.forEach((value, key) => {
                    if (value) {
                        doc.text(`${key}: ${value}`, 20, y);
                        y += 10;
                        
                        // Add to email body
                        emailBody += `${key}: ${value}\n`;
                    }
                });

                // Save PDF to a blob
                const pdfBlob = doc.output('blob');

                // Send email using EmailJS
                const emailData = {
                    to: 'asadaliasr104@gmail.com',
                    subject: 'جامعہ رسولیہ شیرازیہ رضویہ - داخلہ فارم',
                    body: emailBody,
                    attachment: pdfBlob
                };

                await emailjs.send('asadali_a5647sad', 'template_3krxdoo', emailData, 'JWhAl3d1o9VgFNtj2');
                
                showNotification('فارم کامیابی سے بھیجا گیا ہے!');
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                showNotification('فارم بھیجے جانے میں مسئلہ ہوا۔ لطفاً دوبارہ کوشش کریں۔', true);
            }
        });
    }
});

// Phone number validation
function validatePhone(phone) {
    // Pakistani phone number format
    const regex = /^(\+92|0092)?[-.\s]?((3)[0-9]{2})[-.\s]?([0-9]{7})$/;
    return regex.test(phone);
}

// Initialize signature pad when page loads
document.addEventListener('DOMContentLoaded', function() {
    signaturePad.init();
});
