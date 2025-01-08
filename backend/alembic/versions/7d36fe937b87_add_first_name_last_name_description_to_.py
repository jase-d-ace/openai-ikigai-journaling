"""add first name, last name, description to users

Revision ID: 7d36fe937b87
Revises: fab1bc7702a7
Create Date: 2025-01-08 13:10:43.952364

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7d36fe937b87'
down_revision: Union[str, None] = 'fab1bc7702a7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('first_name', sa.VARCHAR(), default=sa.text('')))
    op.add_column('users', sa.Column('last_name', sa.VARCHAR(), default=sa.text('')))
    op.add_column('users', sa.Column('description', sa.VARCHAR(), default=sa.text('')))
    pass


def downgrade() -> None:
    pass
