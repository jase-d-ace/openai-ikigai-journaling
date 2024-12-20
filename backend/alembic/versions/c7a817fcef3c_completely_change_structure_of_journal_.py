"""completely change structure of journal table

Revision ID: c7a817fcef3c
Revises: 5c1dd5900fde
Create Date: 2024-12-16 17:31:22.462085

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c7a817fcef3c'
down_revision: Union[str, None] = '5c1dd5900fde'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
