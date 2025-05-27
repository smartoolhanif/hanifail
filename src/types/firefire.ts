export interface FireFireApiResponse {
  AccountInfo: {
    AccountAvatarId: number;
    AccountBPBadges: number;
    AccountBPID: number;
    AccountBannerId: number;
    AccountCreateTime: string;
    AccountEXP: number;
    AccountLastLogin: string;
    AccountLevel: number;
    AccountLikes: number;
    AccountName: string;
    AccountRegion: string;
    AccountSeasonId: number;
    AccountType: number;
    BrMaxRank: number;
    BrRankPoint: number;
    CsMaxRank: number;
    CsRankPoint: number;
    EquippedWeapon: number[];
    ReleaseVersion: string;
    ShowBrRank: boolean;
    ShowCsRank: boolean;
    Title: number;
  };
  AccountProfileInfo: {
    EquippedOutfit: number[];
    EquippedSkills: number[];
  };
  GuildInfo: {
    GuildCapacity: number;
    GuildID: string;
    GuildLevel: number;
    GuildMember: number;
    GuildName: string;
    GuildOwner: string;
  };
  captainBasicInfo: {
    EquippedWeapon: number[];
    accountId: string;
    accountType: number;
    badgeCnt: number;
    badgeId: string;
    bannerId: string;
    createAt: string;
    csMaxRank: number;
    csRank: number;
    csRankingPoints: number;
    exp: number;
    headPic: string;
    lastLoginAt: string;
    level: number;
    liked: number;
    maxRank: number;
    nickname: string;
    rank: number;
    rankingPoints: number;
    region: string;
    releaseVersion: string;
    seasonId: number;
    showBrRank: boolean;
    showCsRank: boolean;
    title: number;
  };
  creditScoreInfo: {
    creditScore: number;
    periodicSummaryEndTime: string;
    periodicSummaryStartTime: string;
  };
  petInfo: {
    exp: number;
    id: number;
    isMarkedStar: boolean;
    isSelected: boolean;
    level: number;
    selectedSkillId: number;
    skinId: number;
  };
  socialinfo: {
    AccountLanguage: string;
    AccountPreferMode: null | string;
    AccountSignature: string;
  };
}