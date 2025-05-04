<template>
    <div class="evaluation-container">
      <!-- Summary Dashboard -->
      <div class="summary-card">
        <h2>Outfit Evaluation Summary</h2>
        <div class="summary-content">
          <div class="score-circle">
            <span>{{ evaluation.overall_evaluation.percentage }}%</span>
            <p>Total Score: {{ evaluation.overall_evaluation.total_score }}/60</p>
          </div>
          <div class="verdict">
            <h3>{{ evaluation.overall_evaluation.verdict }}</h3>
            <p>{{ evaluation.overall_evaluation.summary }}</p>
          </div>
        </div>
        <button @click="toggleDetails" class="details-toggle">
          {{ showDetails ? 'Hide Details' : 'Show Details' }}
        </button>
      </div>
  
      <!-- Detailed Analysis (Collapsible) -->
      <div v-if="showDetails" class="details-container">
        <!-- Person Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('person')" class="section-header">
            Person Analysis
            <span>{{ sections.person ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.person" class="section-content">
            <p><strong>Style Category:</strong> {{ evaluation.person_analysis.style_category }}</p>
            <p><strong>Color Palette:</strong> {{ evaluation.person_analysis.color_palette.join(', ') }}</p>
            <p><strong>Body Type:</strong> {{ evaluation.person_analysis.body_type }}</p>
            <p><strong>Notable Features:</strong> {{ evaluation.person_analysis.notable_features }}</p>
          </div>
        </div>
  
        <!-- Garment Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('garment')" class="section-header">
            Garment Analysis
            <span>{{ sections.garment ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.garment" class="section-content">
            <p><strong>Type:</strong> {{ evaluation.garment_analysis.type }}</p>
            <p><strong>Color:</strong> {{ evaluation.garment_analysis.color }}</p>
            <p><strong>Style Category:</strong> {{ evaluation.garment_analysis.style_category }}</p>
            <p><strong>Formality Level:</strong> {{ evaluation.garment_analysis.formality_level }}/10</p>
            <p><strong>Season Appropriateness:</strong> {{ evaluation.garment_analysis.season_appropriateness }}</p>
          </div>
        </div>
  
        <!-- Occasion Analysis -->
        <div class="analysis-section">
          <h3 @click="toggleSection('occasion')" class="section-header">
            Occasion Analysis
            <span>{{ sections.occasion ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.occasion" class="section-content">
            <p><strong>Formality Required:</strong> {{ evaluation.occasion_analysis.formality_required }}/10</p>
            <p><strong>Typical Dress Code:</strong> {{ evaluation.occasion_analysis.typical_dress_code }}</p>
            <p><strong>Environmental Factors:</strong> {{ evaluation.occasion_analysis.environmental_factors }}</p>
          </div>
        </div>
  
        <!-- Compatibility Scores -->
        <div class="analysis-section">
          <h3 @click="toggleSection('compatibility')" class="section-header">
            Compatibility Scores
            <span>{{ sections.compatibility ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.compatibility" class="section-content">
            <h4>Person-Garment Match</h4>
            <div class="score-item">
              <p><strong>Style Harmony:</strong> {{ evaluation.compatibility_scores.person_garment_match.style_harmony.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.person_garment_match.style_harmony.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Color Coordination:</strong> {{ evaluation.compatibility_scores.person_garment_match.color_coordination.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.person_garment_match.color_coordination.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Fit Appropriateness:</strong> {{ evaluation.compatibility_scores.person_garment_match.fit_appropriateness.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.person_garment_match.fit_appropriateness.explanation }}</p>
            </div>
            <h4>Garment-Occasion Match</h4>
            <div class="score-item">
              <p><strong>Formality Appropriateness:</strong> {{ evaluation.compatibility_scores.garment_occasion_match.formality_appropriateness.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.garment_occasion_match.formality_appropriateness.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Functional Suitability:</strong> {{ evaluation.compatibility_scores.garment_occasion_match.functional_suitability.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.garment_occasion_match.functional_suitability.explanation }}</p>
            </div>
            <div class="score-item">
              <p><strong>Cultural Alignment:</strong> {{ evaluation.compatibility_scores.garment_occasion_match.cultural_alignment.score }}/10</p>
              <p>{{ evaluation.compatibility_scores.garment_occasion_match.cultural_alignment.explanation }}</p>
            </div>
          </div>
        </div>
  
        <!-- Improvement Suggestions -->
        <div class="analysis-section" v-if="evaluation.overall_evaluation.percentage < 80">
          <h3 @click="toggleSection('improvements')" class="section-header">
            Improvement Suggestions
            <span>{{ sections.improvements ? '▲' : '▼' }}</span>
          </h3>
          <div v-if="sections.improvements" class="section-content">
            <ul>
              <li v-for="(suggestion, index) in evaluation.overall_evaluation.improvement_suggestions" :key="index">
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Reset Button -->
      <button @click="$emit('reset')" class="reset-button">Back to Upload</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OutfitEvaluation',
    props: {
      recommendations: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        evaluation: this.recommendations,
        showDetails: false,
        sections: {
          person: false,
          garment: false,
          occasion: false,
          compatibility: false,
          improvements: false
        }
      };
    },
    methods: {
      toggleDetails() {
        this.showDetails = !this.showDetails;
      },
      toggleSection(section) {
        this.sections[section] = !this.sections[section];
      }
    }
  };
  </script>
  
  <style scoped>
  .evaluation-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .summary-card {
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .summary-content {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #f19586;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
  }
  
  .score-circle p {
    font-size: 12px;
    margin-top: 5px;
  }
  
  .verdict h3 {
    color: #514f4c;
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .verdict p {
    font-size: 16px;
    color: #666;
  }
  
  .details-toggle {
    background-color: #cfc5b3;
    color: #514f4c;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .details-toggle:hover {
    background-color: #b8a89a;
  }
  
  .details-container {
    margin-top: 20px;
  }
  
  .analysis-section {
    margin-bottom: 15px;
    border: 1px solid #cfc5b3;
    border-radius: 5px;
  }
  
  .section-header {
    background-color: #f8f8f8;
    padding: 15px;
    font-size: 18px;
    color: #514f4c;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .section-content {
    padding: 15px;
    background-color: white;
  }
  
  .section-content p, .section-content ul {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
  }
  
  .section-content h4 {
    margin: 15px 0 10px;
    font-size: 16px;
    color: #514f4c;
  }
  
  .score-item {
    margin-bottom: 15px;
  }
  
  .score-item p:first-child {
    font-weight: bold;
  }
  
  .section-content ul {
    list-style: disc;
    padding-left: 20px;
  }
  
  .reset-button {
    display: block;
    margin: 20px auto;
    background-color: #f19586;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .reset-button:hover {
    background-color: #e07b6a;
  }
  
  @media screen and (max-width: 768px) {
    .summary-content {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .score-circle {
      width: 80px;
      height: 80px;
      font-size: 20px;
    }
  
    .score-circle p {
      font-size: 10px;
    }
  
    .verdict h3 {
      font-size: 18px;
    }
  
    .verdict p {
      font-size: 14px;
    }
  
    .section-header {
      font-size: 16px;
    }
  
    .section-content p {
      font-size: 14px;
    }
  }
  </style>