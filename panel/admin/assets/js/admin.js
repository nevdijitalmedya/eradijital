// Era Dijital Admin Panel — Core JS
document.addEventListener('DOMContentLoaded', function () {
    // Auto-slug generation from title input
    const slugifyInputs = document.querySelectorAll('[data-slugify]');
    slugifyInputs.forEach(input => {
        const targetId = input.getAttribute('data-slugify');
        const targetInput = document.getElementById(targetId);
        if (targetInput) {
            input.addEventListener('input', function () {
                if (targetInput.dataset.manual === 'true') return;
                
                // Turkish character map
                const trMap = {'ç':'c','ğ':'g','ı':'i','ö':'o','ş':'s','ü':'u',
                               'Ç':'c','Ğ':'g','İ':'i','Ö':'o','Ş':'s','Ü':'u'};
                
                let text = input.value;
                // Replace Turkish characters
                for (const [tr, en] of Object.entries(trMap)) {
                    text = text.split(tr).join(en);
                }
                
                text = text.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
                targetInput.value = text;
            });

            targetInput.addEventListener('change', function() {
                targetInput.dataset.manual = 'true';
            });
        }
    });

    // Auto-fade alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});
