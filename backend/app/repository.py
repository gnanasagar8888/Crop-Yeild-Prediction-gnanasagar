from app.database import users_collection


# -------------------------
# Create User
# -------------------------
def create_user(user):
    return users_collection.insert_one(user)


# -------------------------
# Find by Username
# -------------------------
def find_user(username):
    return users_collection.find_one({"username": username})


# -------------------------
# Find by Email
# -------------------------
def find_user_by_email(email):
    return users_collection.find_one({"email": email})