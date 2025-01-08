"""add more fields to User model

Revision ID: fab1bc7702a7
Revises: c7a817fcef3c
Create Date: 2025-01-07 19:03:42.724647

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'fab1bc7702a7'
down_revision: Union[str, None] = 'c7a817fcef3c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
