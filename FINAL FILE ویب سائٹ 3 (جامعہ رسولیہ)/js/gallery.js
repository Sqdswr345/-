document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Enhanced Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let currentImageIndex = 0;
    let images = Array.from(galleryImages);
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxContent.appendChild(lightboxImg);
    
    const controls = document.createElement('div');
    controls.className = 'lightbox-controls';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-btn prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-right"></i> پچھلی تصویر';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-btn next';
    nextBtn.innerHTML = 'اگلی تصویر <i class="fas fa-chevron-left"></i>';
    
    const downloadBtn = document.createElement('a');
    downloadBtn.className = 'lightbox-btn download';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> ڈاؤن لوڈ';
    downloadBtn.setAttribute('download', '');
    
    controls.appendChild(prevBtn);
    controls.appendChild(downloadBtn);
    controls.appendChild(nextBtn);
    lightboxContent.appendChild(controls);
    
    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);
    
    // Open lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Update lightbox image
    function updateLightboxImage() {
        const img = images[currentImageIndex];
        lightboxImg.src = img.src;
        downloadBtn.href = img.src;
        
        // Update navigation buttons
        prevBtn.style.display = currentImageIndex > 0 ? '' : 'none';
        nextBtn.style.display = currentImageIndex < images.length - 1 ? '' : 'none';
        
        // Update download button
        const fileName = img.src.split('/').pop();
        downloadBtn.download = fileName;
    }
    
    // Navigation
    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateLightboxImage();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateLightboxImage();
        }
    });
    
    // Close lightbox
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateLightboxImage();
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateLightboxImage();
                }
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });
});
