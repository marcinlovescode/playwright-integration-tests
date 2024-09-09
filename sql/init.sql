CREATE TABLE IF NOT EXISTS users (
    slackId INT NOT NULL,
    boxId INT NOT NULL,
    CONSTRAINT PK_User PRIMARY KEY (slackId, boxId),
    CONSTRAINT UC_User_SlackID UNIQUE (slackId),
    CONSTRAINT UC_User_BoxID UNIQUE (boxId)
);

-- Insert sample data
INSERT INTO users (slackId, boxId) VALUES (1, 100), (2, 200), (3, 300);