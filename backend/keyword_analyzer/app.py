from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes (allow requests from different ports)

# Simulated data for keyword analysis (You can replace this with real data or analysis logic)
keyword_data = {
    "React": [
        ["React", 150],
        ["JavaScript", 120],
        ["Frontend", 100],
        ["Programming", 80]
    ],
    "JavaScript": [
        ["JavaScript", 200],
        ["Frontend", 180],
        ["Node.js", 150],
        ["React", 130]
    ],
    "Node.js": [
        ["Node.js", 130],
        ["JavaScript", 110],
        ["Backend", 90],
        ["API", 70]
    ],
    "Python": [
        ["Python", 180],
        ["Programming", 150],
        ["Data Science", 120],
        ["Machine Learning", 100]
    ],
    "Frontend": [
        ["Frontend", 120],
        ["JavaScript", 110],
        ["React", 100],
        ["HTML", 90]
    ]
}

# Helper function to create SEO-friendly meta tags
def generate_meta_tags(title, description):
    # Ensure the title is between 50 and 60 characters
    meta_title = title[:60] if len(title) > 60 else title
    # Ensure the description is between 150 and 160 characters
    meta_description = description[:160] if len(description) > 160 else description

    # Return the meta title and meta description
    return {
        "meta_title": f"<title>{meta_title}</title>",
        "meta_description": f'<meta name="description" content="{meta_description}" />'
    }

# Route to generate SEO-friendly meta tags
@app.route('/generate_meta_tags', methods=['POST'])
def generate_meta_tags_endpoint():
    # Get the JSON data from the request
    data = request.get_json()

    title = data.get('title', '').strip()
    description = data.get('description', '').strip()

    # If title or description is empty, return an error
    if not title or not description:
        return jsonify({"error": "Title and description are required."}), 400

    # Generate the meta tags
    meta_tags = generate_meta_tags(title, description)

    # Return the generated meta tags as JSON
    return jsonify(meta_tags)

# Route to analyze the keyword
@app.route('/analyze_keywords', methods=['GET'])
def analyze_keywords():
    # Get the keyword from query parameters
    keyword = request.args.get('keyword', '').strip()

    # Check if the keyword is provided and not empty
    if not keyword:
        return jsonify({"error": "Please enter a valid keyword."}), 400

    # Search for the keyword in our simulated data
    analysis_results = keyword_data.get(keyword)

    # If no analysis results are found for the keyword
    if not analysis_results:
        return jsonify({"error": "No results found for the given keyword."}), 404

    # Return the analysis results as JSON
    return jsonify({"keywords": analysis_results})

if __name__ == '__main__':
    app.run(debug=True)
