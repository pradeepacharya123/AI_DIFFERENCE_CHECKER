import os
import uuid
from werkzeug.datastructures import FileStorage

def save_uploaded_file(file_obj: FileStorage, upload_folder: str, prefix: str = "") -> str:
    """
    Saves an uploaded Werkzeug FileStorage to upload_folder.
    Returns the full saved path.
    """
    # Keep the original extension
    filename = file_obj.filename or ""
    _, ext = os.path.splitext(filename)
    unique = prefix + uuid.uuid4().hex + ext
    out_path = os.path.join(upload_folder, unique)
    file_obj.save(out_path)
    return out_path
