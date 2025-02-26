# type:ignore
import tensorflow as tf
import os

# Create a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, activation='relu', input_shape=(20,)),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Save model
os.makedirs("models", exist_ok=True)
model.save("models/medical_cnn.h5")

print("✅ Dummy model saved successfully in 'models/' folder!")
