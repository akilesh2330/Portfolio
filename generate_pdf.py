import sys
from fpdf import FPDF

class ResumePDF(FPDF):
    def header(self):
        pass

    def section_banner(self, title):
        self.ln(3)
        self.set_fill_color(214, 228, 240)  # Light blue banner #d6e4f0
        self.set_text_color(0, 0, 0)
        self.set_font("Helvetica", "B", 11)
        self.cell(0, 7, f" {title}", fill=True, new_x="LMARGIN", new_y="NEXT", align="L")
        self.ln(2)

def generate_resume():
    pdf = ResumePDF(format="A4")
    pdf.set_margins(15, 12, 15)
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=10)

    # Name
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 8, "AKILESH K", new_x="LMARGIN", new_y="NEXT")

    # Subtitle
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 6, "DATA SCIENCE Student", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

    # Contact Info
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(0, 0, 0)
    pdf.write(5, "6374171882  |  ")
    pdf.set_text_color(37, 99, 235)
    pdf.write(5, "akilesh2330@gmail.com", "mailto:akilesh2330@gmail.com")
    pdf.set_text_color(0, 0, 0)
    pdf.write(5, "  |  ")
    pdf.set_text_color(37, 99, 235)
    pdf.write(5, "LinkedIn: Akilesh K", "https://www.linkedin.com/in/akilesh230307")
    pdf.ln(7)

    # 1. ABOUT ME
    pdf.section_banner("ABOUT ME")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.multi_cell(0, 5, "Aspiring AI and Data Science professional with strong knowledge of Java, Python, DSA, DBMS and Machine Learning. Interested in applying technical skills to solve real-world problems while gaining practical experience and contributing to innovative projects.")

    # 2. EDUCATION
    pdf.section_banner("EDUCATION")
    
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Dr. N.G.P. Institute of Technology, Coimbatore", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5, "B.Tech - Artificial Intelligence & Data Science", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 5, "5th Semester | Current CGPA: 7.6 | Expected Graduation: 2028", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Srinivasa Vidhyalaya Matric Hr.Sec.School", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5, "State Board of School Education", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 5, "10th-Percentage: 76.6% | 12-Percentage: 72.67%", new_x="LMARGIN", new_y="NEXT")

    # 3. SKILL
    pdf.section_banner("SKILL")
    pdf.set_font("Helvetica", "", 10)
    skills = [
        ("Programming Languages: ", "Python, Java, R Language"),
        ("Data Structures & Algorithms (DSA)", ""),
        ("Database Management Systems (MYSQL)", ""),
        ("Machine Learning & Artificial Intelligence", ""),
        ("Problem Solving & Logical Thinker", "")
    ]
    for label, val in skills:
        pdf.cell(6, 5, chr(149), align="C")
        if val:
            pdf.set_font("Helvetica", "B", 10)
            pdf.write(5, label)
            pdf.set_font("Helvetica", "", 10)
            pdf.write(5, val)
            pdf.ln(5)
        else:
            pdf.set_font("Helvetica", "", 10)
            pdf.cell(0, 5, label, new_x="LMARGIN", new_y="NEXT")

    # 4. INTERNSHIP
    pdf.section_banner("INTERNSHIP")
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Nextskill Technologies Pvt. Ltd. - Certificate of Training Completion", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(6, 5, "-", align="C")
    pdf.cell(0, 5, "Completed an internship training program in Full Stack Development (May 2026)", new_x="LMARGIN", new_y="NEXT")

    # 5. CERTIFICATIONS & EVENTS
    pdf.section_banner("CERTIFICATIONS & EVENTS")
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Kumaraguru College of Technology (KCT), Coimbatore", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "I", 10)
    pdf.cell(0, 5, "Code2Duo - Coding Event", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(6, 5, "-", align="C")
    pdf.multi_cell(0, 5, "Participated in the Code2Duo competitive programming event, demonstrating problem-solving and coding skills.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Basics of Data Structures & Algorithms - Simplilearn SkillUp", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(6, 5, "-", align="C")
    pdf.multi_cell(0, 5, "Completed an online certification focused on Data Structures, Algorithms and coding fundamentals to enhance logical thinking and programming skills.")

    # 6. PROJECT
    pdf.section_banner("PROJECT")
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "AI-Based Government Scholarship Finder & Application Optimizer:", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(6, 5, "-", align="C")
    pdf.multi_cell(0, 5, "Developed an AI-powered scholarship recommendation platform that matches students with eligible government scholarships based on their profiles.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 10.5)
    pdf.cell(0, 5, "Touchless Eye Blink Authentication", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(6, 5, "-", align="C")
    pdf.multi_cell(0, 5, "Built a touchless, AI-powered eye-blink authentication system using real-time computer vision (EAR-based blink detection) and iris/retina features, with liveness detection and low-light/spectacle support - no extra hardware needed.")

    pdf.output("assets/resume/Akilesh_K_Resume.pdf")
    pdf.output("assets/resume/resume.pdf")
    print("PDF generated successfully!")

if __name__ == "__main__":
    generate_resume()
