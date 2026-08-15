            </main>
        </div>
    </div>

    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom Admin JS -->
    <script src="assets/js/admin.js"></script>

    <!-- Rich Text Editor (TinyMCE) Init -->
    <script>
        if (typeof tinymce !== 'undefined') {
            tinymce.init({
                selector: 'textarea.wysiwyg',
                height: 400,
                menubar: false,
                skin: 'oxide-dark',
                content_css: 'dark',
                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | code help',
                content_style: 'body { font-family:Outfit,Helvetica,Arial,sans-serif; font-size:14px; background-color: #1a1528; color: #e5e7eb; }',
                language: 'tr'
            });
        }
    </script>
</body>
</html>
