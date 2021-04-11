const ROLES = {
  owner: 'owner',
  member: 'member',
};

/**
 * Create member.
 *
 * @param {object} data - Organization.
 * @param {object} user - User.
 * @return {object} - Member model.
 */
export const member = (data, user) => {
  return {
    uid: user.uid,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    role: data.owner.uid === user.uid ? ROLES.owner : ROLES.member,
  };
};

export class Member {
  constructor(data, user) {
    this.uid = user.uid;
    this.email = user.email;
    this.username = user.username;
    this.displayName = user.displayName;
    this.role = data.owner === user.uid ? ROLES.owner : ROLES.member;
  }

  toString() {
    return `${this.uid}, ${this.email}, ${this.username}, ${this.displayName}, ${this.role}`;
  }
}
