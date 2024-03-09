import json

def count_words(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            words = content.split()
            word_count = len(words)
            return word_count
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
        return None

def save_word_count_to_json(word_count, output_filename):
    data = {"count": word_count}
    try:
        with open(output_filename, 'w') as json_file:
            json.dump(data, json_file)
        print(f"Word count saved to '{output_filename}'.")
    except Exception as e:
        print(f"Error occurred while saving to '{output_filename}': {e}")

def main(input_filename, output_filename):
    word_count = count_words(input_filename)
    if word_count is not None:
        save_word_count_to_json(word_count, output_filename)

if __name__ == "__main__":
    input_filename = "test.txt"  # Change this to your input file name
    output_filename = "./send/word_count.json"  # Change this to your output file name
    main(input_filename, output_filename)
    print("Done!!!!")
