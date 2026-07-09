from users.models import CustomUser
from projects.models import Project, Issue

def run_seed():
    user = CustomUser.objects.first()
    
    # Create projects
    p1 = Project.objects.create(name="Website Redesign", desc="Overhauling the main landing page for better conversions.", owner=user)
    p2 = Project.objects.create(name="Mobile App MVP", desc="Building the iOS application using React Native.", owner=user)
    
    # Create issues
    Issue.objects.create(title="Fix CSS on Login", desc="The buttons are misaligned.", project=p1, reporter=user, priority="HIGH")
    Issue.objects.create(title="Setup push notifications", desc="Need APNs certificates.", project=p2, reporter=user, priority="MEDIUM")
    
    print("Database seeded with sample Projects and Issues!")

run_seed()
