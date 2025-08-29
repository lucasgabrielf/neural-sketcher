from PIL import Image, ImageDraw, ImageOps

def compress_png(input_path, output_path, threshold=127):
    try:
        img = Image.open(input_path)

        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        # step 1: Use the Alpha channel as the grayscale information
        alpha = img.split()[-1]

        # step 2: Resize the image (28x28)
        resized_img = alpha.resize((28, 28), Image.Resampling.LANCZOS)

        # step 3: Ensure the image is in 8-bit grayscale (redundant due to step 1)
        # grayscale_img = resized_img.convert('L')

        # step 4: Save the final processed image
        resized_img.save(output_path)
        print(f"Successfully transformed '{input_path}' to '{output_path}'")

    except FileNotFoundError:
        print(f"Error: The file '{input_path}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
