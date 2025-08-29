from PIL import Image
import tensorflow as tf
import numpy as np
import os

class DigitsClassifierModel:
    def __init__(self):
        self.model_path = os.path.join(os.getcwd(), "Model/Digits-Classifier-Model.keras")
        print(f"Loading model from: {self.model_path}")

        try:
            self.model = tf.keras.models.load_model(self.model_path)
            print("\nModel loaded successfully!")
            self.model.summary()
        except Exception as e:
            print(f"\nError loading model: {e}")
    
    def _preprocess_data(self, image_path):
        try:
            image = Image.open(image_path)

            transformed_image = np.array(image)
            # normalize the pixel values to be between 0 and 1
            transformed_image = transformed_image / 255.0
            # the model expects a shape of (batch_size, height, width, channels) = (1, 28, 28, 1)
            transformed_image = transformed_image.reshape(1, 28, 28, 1)
            transformed_image = transformed_image.astype('float32')

            print(f"Image {image_path} preprocessed successfully.")

        except FileNotFoundError:
            print(f"Error: The file '{image_path}' was not found.")
            transformed_image = None

        return transformed_image
    
    def predict(self, image_path):
        transformed_image = self._preprocess_data(image_path)

        if transformed_image is not None:
            predictions = self.model.predict(transformed_image)

            predicted_digit = np.argmax(predictions)
            confidence = np.max(predictions)

            print("\n--- Prediction Result ---")
            print(f"Predicted Digit: {predicted_digit}")
            print(f"Confidence: {confidence:.2%}")

            # full probability distribution
            print("\nProbability Distribution:")
            for digit, probability in enumerate(predictions[0]):
                print(f"Digit {digit}: {probability:.4f}")
            return predictions
        else:
            return None
            
