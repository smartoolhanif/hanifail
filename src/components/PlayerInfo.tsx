import { useState } from 'react';
import type { FireFireApiResponse } from '../types/firefire';

export function PlayerInfo() {
  const [uid, setUid] = useState('');
  const [region, setRegion] = useState('');
  const [playerData, setPlayerData] = useState<FireFireApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayerInfo = async () => {
    if (!uid || !region) {
      setError('Please enter both UID and region');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://hanif-full-info.vercel.app/player-info?uid=${uid}&region=${region}`);
      if (!response.ok) {
        throw new Error('Failed to fetch player info');
      }
      const data: FireFireApiResponse = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <div className="player-info">
      <div className="input-group">
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter UID"
        />
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Enter region (e.g., ind)"
        />
        <button onClick={fetchPlayerInfo} disabled={loading}>
          {loading ? 'Loading...' : 'Get Player Info'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {playerData && (
        <div className="player-data">
          <div className="section">
            <h2>Account Information</h2>
            <div className="info-grid">
              <div>
                <strong>Name:</strong> {playerData.AccountInfo.AccountName}
              </div>
              <div>
                <strong>Level:</strong> {playerData.AccountInfo.AccountLevel}
              </div>
              <div>
                <strong>Region:</strong> {playerData.AccountInfo.AccountRegion}
              </div>
              <div>
                <strong>Account Type:</strong> {playerData.AccountInfo.AccountType}
              </div>
              <div>
                <strong>Created:</strong> {formatDate(playerData.AccountInfo.AccountCreateTime)}
              </div>
              <div>
                <strong>Last Login:</strong> {formatDate(playerData.AccountInfo.AccountLastLogin)}
              </div>
              <div>
                <strong>Experience:</strong> {playerData.AccountInfo.AccountEXP.toLocaleString()}
              </div>
              <div>
                <strong>Likes:</strong> {playerData.AccountInfo.AccountLikes.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Guild Information</h2>
            <div className="info-grid">
              <div>
                <strong>Guild Name:</strong> {playerData.GuildInfo.GuildName}
              </div>
              <div>
                <strong>Guild Level:</strong> {playerData.GuildInfo.GuildLevel}
              </div>
              <div>
                <strong>Members:</strong> {playerData.GuildInfo.GuildMember}/{playerData.GuildInfo.GuildCapacity}
              </div>
              <div>
                <strong>Guild ID:</strong> {playerData.GuildInfo.GuildID}
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Rank Information</h2>
            <div className="info-grid">
              <div>
                <strong>BR Max Rank:</strong> {playerData.AccountInfo.BrMaxRank}
              </div>
              <div>
                <strong>BR Rank Points:</strong> {playerData.AccountInfo.BrRankPoint}
              </div>
              <div>
                <strong>CS Max Rank:</strong> {playerData.AccountInfo.CsMaxRank}
              </div>
              <div>
                <strong>CS Rank Points:</strong> {playerData.AccountInfo.CsRankPoint}
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Social Information</h2>
            <div className="info-grid">
              <div>
                <strong>Language:</strong> {playerData.socialinfo.AccountLanguage}
              </div>
              <div>
                <strong>Signature:</strong> {playerData.socialinfo.AccountSignature}
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Pet Information</h2>
            <div className="info-grid">
              <div>
                <strong>Level:</strong> {playerData.petInfo.level}
              </div>
              <div>
                <strong>Experience:</strong> {playerData.petInfo.exp}
              </div>
              <div>
                <strong>Marked Star:</strong> {playerData.petInfo.isMarkedStar ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Selected:</strong> {playerData.petInfo.isSelected ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}